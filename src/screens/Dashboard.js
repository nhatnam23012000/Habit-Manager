import React from 'react'
import styled from 'styled-components/native'

const StyledView = styled.View`
  background-color: #FFF;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const StyledText = styled.Text`
  color: #000;
`

export default function Dashboard() {
  return (
    <StyledView>
      <StyledText>This is Dashboard</StyledText>
    </StyledView>
  )
}
