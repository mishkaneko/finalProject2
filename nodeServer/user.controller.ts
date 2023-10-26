import {
  object,
  email,
  string,
  ParserContext,
  InvalidInputError,
  int,
  array,
} from 'cast.ts';
import { HttpController } from './http.controller';
import { UserService } from './user.service';
import { encodeJWT, getToken } from './jwt';
import { Request } from 'express';
import { HttpError } from './http.error';
import { mkdirSync } from 'fs';
import formidable, { Fields, Files } from 'formidable';

let password = () => {
  let stringParser = string({ minLength: 8, trim: true });
  return {
    sampleValue: '12345abc',
    randomSample: () => '12345abc',
    parse: (input: unknown, context: ParserContext = {}): string => {
      let string = stringParser.parse(input, {
        ...context,
        overrideType: 'password',
      });
      let expectedType = 'password';
      if (!/[a-zA-Z]/.test(string)) {
        throw new InvalidInputError({
          name: context.name,
          typePrefix: context.typePrefix,
          expectedType,
          reason: 'Password should contain at least one letter',
          reasonSuffix: context.reasonSuffix,
        });
      }
      if (!/\d/.test(string)) {
        throw new InvalidInputError({
          name: context.name,
          typePrefix: context.typePrefix,
          expectedType,
          reason: 'Password should contain at least one number',
          reasonSuffix: context.reasonSuffix,
        });
      }
      return string;
    },
    type: 'password',
  };
};

export class UserController extends HttpController {
  uploadDir = 'uploads';
  constructor(private userService: UserService) {
    super();
    mkdirSync(this.uploadDir, { recursive: true });
    this.router.post('/users/login', this.wrapMethod(this.login));
    this.router.post('/users/registration', this.wrapMethod(this.registration));
    this.router.get('/user/getprofile', this.wrapMethod(this.getProfile));
    this.router.patch(
      '/user/profile/passwordupdate',
      this.wrapMethod(this.passwordUpdatefromProfile)
    );
    this.router.get(
      '/passenger/ridehistory',
      this.wrapMethod(this.getPassengerRideHistory)
    );
    this.router.get('/user/rating', this.wrapMethod(this.getRating));
    this.router.patch(
      '/user/profileupdate',
      this.wrapMethod(this.profileUpdate)
    );
    this.router.get(
      '/driver/ridehistory',
      this.wrapMethod(this.getDriveRideHistory)
    );
    this.router.patch(
      '/driver/updatestatus',
      this.wrapMethod(this.updateDriverStatus)
    );
    this.router.post('/user/avatar', this.wrapMethod(this.uploadAvatar));
    this.router.get('/user/avatar', this.wrapMethod(this.getAvatar));
    this.router.get(
      '/user/commentpublished',
      this.wrapMethod(this.getCommentPublished)
    );
    this.router.get(
      '/user/commentpublished/:id',
      this.wrapMethod(this.getEachCommentPublished)
    );
    this.router.post(
      '/user/commentpublished/:id',
      this.wrapMethod(this.postEachCommentPublished)
    );
  }

  async login(req: Request) {
    let input = object({
      body: object({
        email: email(),
        password: string({ trim: true, nonEmpty: true }),
      }),
    }).parse(req);
    let user = await this.userService.login(input.body);
    console.log('controller', user);
    return {
      token: encodeJWT({
        user_id: user.id,
        role: user.role,
      }),
    };
  }

  async registration(req: Request) {
    console.log(req.body);

    if (req.body.userType == 'driver') {
      let input = object({
        body: object({
          userType: string(),
          name: string(),
          email: email(),
          gender: string(),
          phone: string(),
          password: password(),
          hkid: string(),
          drivingLicenseNo: string(),
          taxiDriverIdentityPlate: string(),
          vehicleLicense: string(),
          licensePlateNo: string(),
        }),
      }).parse(req);
      let newDriverRegister = await this.userService.driverRegister(input.body);
      console.log({ newDriverRegister });
      return newDriverRegister;
    }
    if (req.body.userType == 'passenger') {
      let input = object({
        body: object({
          userType: string(),
          name: string(),
          gender: string(),
          email: email(),
          phone: string(),
          password: password(),
        }),
      }).parse(req);
      let newPassengerRegister = await this.userService.passengerRegister(
        input.body
      );
      console.log({ newPassengerRegister });
      return newPassengerRegister;
    }
  }

  async getProfile(req: Request) {
    console.log('controller getProfile');
    let jwt = getToken(req);
    console.log(jwt);
    let result = await this.userService.getProfile(jwt.user_id);
    return result;
  }

  async passwordUpdatefromProfile(req: Request) {
    console.log('controller password update from profile');
    let jwt = getToken(req);
    let updatedPassword = object({
      body: object({
        password: password(),
        confirmedPassword: password(),
      }),
    }).parse(req);
    if (
      updatedPassword.body.password !== updatedPassword.body.confirmedPassword
    ) {
      throw new HttpError(403, 'Password does not matched');
    }
    let result = await this.userService.passwordUpdatefromProfile({
      user_id: jwt.user_id,
      password: updatedPassword.body.password,
    });
    console.log(result);
    return result;
  }

  async getRating(req: Request) {
    console.log('controller getRating');
    let jwt = getToken(req);
    let result = await this.userService.getRating(jwt.user_id);
    console.log('getRatingController', result);
    return result;
  }
  async getPassengerRideHistory(req: Request) {
    // console.log("controller getPassengerRideHisotor");
    let jwt = getToken(req);
    let result = await this.userService.passengerRideHistory(jwt.user_id);
    // console.log("getPassengerRideHistory", result);
    return result;
  }

  async getDriveRideHistory(req: Request) {
    let jwt = getToken(req);
    let result = await this.userService.driverRideHistory(jwt.user_id);
    console.log('getDriverRideHistory', result);
    return result;
  }

  async profileUpdate(req: Request) {
    console.log(req.body);
    let jwt = getToken(req);
    if ((req.body.role = 'passenger')) {
      let updatedProfile = object({
        body: object({
          name: string(),
          phone: string(),
          gender: string(),
        }),
      }).parse(req);
      let result = await this.userService.profileUpdate(
        jwt.user_id,
        updatedProfile.body,
        req.body.role
      );
      console.log('userControllerprofileUpdate', result);
      return {};
    } else {
      let updatedProfile = object({
        body: object({
          name: string(),
          phone: string(),
          gender: string(),
          hkid: string(),
          drivingLicenseNo: string(),
          taxiDriverIdentityPlate: string(),
          vehicleLicense: string(),
          licensePlateNo: string(),
        }),
      }).parse(req);
      console.log(updatedProfile.body);
      let result = await this.userService.profileUpdate(
        jwt.user_id,
        updatedProfile.body,
        req.body.role
      );
      console.log('userControllerprofileUpdate', result);
      return {};
    }
  }

  async updateDriverStatus(req: Request) {
    console.log('Controller updateDriverStatus');
    console.log(req.body);
    let jwt = getToken(req);
    console.log(jwt.user_id);
    let result = await this.userService.driverStatus(
      jwt.user_id,
      req.body.is_available
    );
    console.log('controllerDriverStatusNoresult', result);
  }

  async uploadAvatar(req: Request) {
    console.log('Controller upload avatar req body', req.body);
    let jwt = getToken(req);
    let form = formidable({
      multiples: false,
      uploadDir: this.uploadDir,
      keepExtensions: true,
      filename(name, ext, part, form) {
        let extname = part.mimetype?.split('/').pop()?.split(';')[0];
        return jwt.user_id + '-avatar.' + extname;
      },
    });
    let { fields, files } = await new Promise<{ fields: Fields; files: Files }>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          console.dir({ err, fields, files }, { depth: 3 });
          if (err) reject(err);
          else resolve({ fields, files });
        });
      }
    );

    // console.log('files.file:', files.file);
    let parser = object({
      files: object({
        file: array(
          object({
            newFilename: string(),
            size: int(),
            mimetype: string(),
          }),
          { maybeSingle: true, minLength: 1, maxLength: 1 }
        ),
      }),
    });
    let input = parser.parse({ files });
    console.log('input.file:', input.files);
    let avatar = input.files.file[0];
    console.log('after parser avatar value', avatar);
    let result = this.userService.uploadAvatar({
      user_id: jwt.user_id,
      filename: avatar.newFilename,
    });
    return result;
  }

  async getAvatar(req: Request) {
    let jwt = getToken(req);
    let result = await this.userService.getAvatar(jwt.user_id);
    return result;
  }

  async getCommentPublished(req: Request) {
    let jwt = getToken(req);
    console.log('Controller getCommentPublished');
    let result = await this.userService.getCommentPublished(jwt.user_id);
    return result;
  }

  async getEachCommentPublished(req: Request) {
    console.log('Controller getEachCommentPublished');
    let commentId = +req.params.id;
    let jwt = getToken(req);
    let result = await this.userService.getEachCommentPublished(commentId);
    console.log('controller', result);
    return result;
  }

  async postEachCommentPublished(req: Request) {
    console.log('Controller postUpdatedComment', req.body);
    let commentId = +req.params.id;
    let comment = req.body.comment;
    let score = req.body.score;
    console.log(req.body.comment);
    let result = await this.userService.postUpdatedComment({
      commentId,
      comment,
      score,
    });
    console.log('controller', result);
    return result;
  }
}
