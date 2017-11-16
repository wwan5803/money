// Dimensions
import Dimensions from 'Dimensions'

const Constant = {
    color: {
        tabbar: '#010e25',
        background: '#011945',
        transBg: 'rgba(1, 25, 69, 0.5)',
        trans: 'rgba(1, 25, 69, 0)',
        onOff: '#48b0f7',
        placeholder: '#000715',
    },
    font: {
        roman: 'AvenirLTStd-Roman',
        book:  'AvenirLTStd-Book',
        light: 'AvenirLTStd-Light',
        black: 'AvenirLTStd-Black'
    },
    layout: {
        screenWidth: Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height,
        magazineWidth: Dimensions.get('window').width / 3,
        videoWidth: Dimensions.get('window').width / 2
    },
    host: 'http://articalhub.com/json/',
}

module.exports = Constant
