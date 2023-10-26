//package com.rideLinker.calculation;
//
//import java.text.DecimalFormat;
//
//public class Fare {
//    public Float AOriginalDistance;
//    public Float BOriginalDistance;
//    private Float priceOfFirst2Km;
//    private Float pricePerEveryKm;
//    private int first2Km;
//    private int totoalAmountofPassengers;
//    private Float AOriginalFare;
//    private Float BOriginalFare;
//    private Float Apaying;
//    private Float Bpaying;
//    private Float totalFare;
//    private Float Asaving;
//    private Float Bsaving;
//    private Float overLappingDistance;
//
//    public Float Adistance;
//    public Float Bdistance;
//    public Float totalDistance;
//
//    public Float getAOriginalFare() {
//        return AOriginalFare;
//    }
//
//    public Float getBOriginalFare() {
//        return BOriginalFare;
//    }
//
//    public Float getApaying() {
//        return Apaying;
//    }
//
//    public Float getBpaying() {
//        return Bpaying;
//    }
//
//    public Float getTotalFare() {
//        return totalFare;
//    }
//
//    public Float getAsaving() {
//        return Asaving;
//    }
//    public Float getBsaving() {
//        return Bsaving;
//    }
//
//    public Fare(Float AOriginalDistance, Float BOriginalDistance, Float Adistance, Float Bdistance, Float totalDistance){
//        this.AOriginalDistance = AOriginalDistance;
//        this.BOriginalDistance = BOriginalDistance;
//        this.Adistance = Adistance/1000; //convert to km
//        this.Bdistance = Bdistance/1000; //convert to km
//        this.totalDistance = totalDistance;
//        priceOfFirst2Km = 27.0;
//        pricePerEveryKm = 1.9;
//        first2Km = 2;
//        totoalAmountofPassengers = 2;
//    }
//
//    private  static final DecimalFormat df = new DecimalFormat("0.00");
//
//
//
//    public void calculateFare(float Adistance, float Bdistance, float totalDistance){
//        totalFare = priceOfFirst2Km + Math.ceil((totalDistance - first2Km)*5)*pricePerEveryKm;
//        df.format(totalFare);
//        if(Adistance<first2Km && Bdistance<first2Km && totalDistance<first2Km){
//            totalFare = priceOfFirst2Km;
//            AOriginalFare = priceOfFirst2Km;
//            BOriginalFare = priceOfFirst2Km;
//
//            Apaying = totalFare / totoalAmountofPassengers;
//            Bpaying = totalFare / totoalAmountofPassengers;
//
//            Asaving = AOriginalFare - Apaying;
//            Bsaving = BOriginalFare - Bpaying;
//        }else if(Adistance<first2Km){
//            AOriginalFare = priceOfFirst2Km;
//            BOriginalFare = totalFare;
//
//            Apaying = priceOfFirst2Km/totoalAmountofPassengers;
//            Bpaying = totalFare - Apaying;
//
//            Asaving = AOriginalFare - Apaying;
//            Bsaving = BOriginalFare - Bpaying;
//
//        }else if (Bdistance < first2Km){
//            BOriginalFare = priceOfFirst2Km;
//            AOriginalFare = totalFare;
//
//            Bpaying = priceOfFirst2Km/totoalAmountofPassengers;
//            Apaying = totalFare - Bpaying;
//
//            Asaving = AOriginalFare - Apaying;
//            Bsaving = BOriginalFare - Bpaying;
//
//        }else if (Adistance == totalDistance){
//            overLappingDistance = Bdistance;
//
//            AOriginalFare = totalFare;
//            BOriginalFare = priceOfFirst2Km + Math.ceil((Bdistance - first2Km)*5)*pricePerEveryKm;
//
//            Apaying = totalFare * (((Adistance - overLappingDistance)/totalDistance)+ overLappingDistance/totalDistance/totoalAmountofPassengers);
//            df.format(Apaying);
//            Bpaying = totalFare * (overLappingDistance/totalDistance/totoalAmountofPassengers);
//            df.format(Bpaying);
//
//            //todo make a insurance;
//            if((Apaying + Bpaying) != totalFare){
//                System.out.println("The caculation didnt make sense");
//            }
//
//            Asaving = AOriginalFare - Apaying;
//            Bsaving = BOriginalFare - Bpaying;
//
//        } else if (Bdistance == totalDistance) {
//            overLappingDistance = Adistance;
//
//            BOriginalFare = totalFare;
//            AOriginalFare = priceOfFirst2Km + Math.ceil((Adistance - first2Km)*5)*pricePerEveryKm;
//
//            Bpaying = totalFare * (((Bdistance - overLappingDistance)/totalDistance)+ overLappingDistance/totalDistance/totoalAmountofPassengers);
//            Apaying = totalFare * (overLappingDistance/totalDistance/totoalAmountofPassengers);
//            df.format(Apaying);
//            df.format(Bpaying);
//
//            //todo make a insurance;
//            if((Apaying + Bpaying) != totalFare){
//                System.out.println("The caculation didnt make sense");
//            }
//
//            Asaving = AOriginalFare - Apaying;
//            Bsaving = BOriginalFare - Bpaying;
//        } else {
//            overLappingDistance = Adistance + Bdistance - totalDistance;
//            AOriginalFare = priceOfFirst2Km + Math.ceil((Adistance - first2Km)*5)*pricePerEveryKm;
//            BOriginalFare = priceOfFirst2Km + Math.ceil((Bdistance - first2Km)*5)*pricePerEveryKm;
//
//            Apaying = totalFare * (((Adistance-overLappingDistance)/totalDistance) + (overLappingDistance/totalDistance/totoalAmountofPassengers));
//            Bpaying = totalFare * (((Bdistance-overLappingDistance)/totalDistance) + (overLappingDistance/totalDistance/totoalAmountofPassengers));
//
//            //todo make a insurance;
//            if((Apaying + Bpaying) != totalFare){
//                System.out.println("The caculation didnt make sense");
//            }
//
//            Asaving = AOriginalFare - Apaying;
//            Bsaving = BOriginalFare - Bpaying;
//        }
//
//    }
//}
