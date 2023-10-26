import { View } from 'react-native'
import React, { useContext } from 'react'
import { JobStatusContext } from '../../contexts/JobStatusContext'
import JobNone from '../../components/driver/screen-components/JobNone'
import JobNew from '../../components/driver/screen-components/JobNew'
import { StyledView } from '../../components/shared/StyledComponents'

const Job = ({ navigation }) => {
  const { jobStatus, setJobStatus } = useContext(JobStatusContext)

  const statusComponentMap = {
    noJob: <JobNone navigation={navigation} />,
    newJob: <JobNew navigation={navigation} />,
  }

  const renderedComponent = statusComponentMap[jobStatus]

  return <View tw="flex-1 bg-teal-50">{renderedComponent}</View>
}

export default Job
