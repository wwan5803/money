'use strict'

// React
import React from 'react'

// React Native
import { NetInfo } from 'react-native'

// Net
export default {
  isConnected: function() {
    return NetInfo.isConnected.fetch()
  }
}
