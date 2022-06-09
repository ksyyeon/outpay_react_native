export default (() => {
    const PinCodeCommon = {
        numbers: [
            {src: require('../assets/images/icon_zero.png'), id: '0'},
            {src: require('../assets/images/icon_one.png'), id: '1'},
            {src: require('../assets/images/icon_two.png'), id: '2'},
            {src: require('../assets/images/icon_three.png'), id: '3'},
            {src: require('../assets/images/icon_four.png'), id: '4'},
            {src: require('../assets/images/icon_five.png'), id: '5'},
            {src: require('../assets/images/icon_six.png'), id: '6'},
            {src: require('../assets/images/icon_seven.png'), id: '7'},
            {src: require('../assets/images/icon_eight.png'), id: '8'},
            {
                src: require('../assets/images/icon_refresh.png'),
                id: 'refresh',
            },
            {src: require('../assets/images/icon_nine.png'), id: '9'},
            {src: require('../assets/images/icon_delete.png'), id: 'delete'},
        ],
        circles: ['0', '1', '2', '3', '4', '5'],
        shuffleNums: numbers => {
            let i = numbers.length - 1;
            for (; i > 0; i--) {
                if (i !== 9 && i !== 11) {
                    const j = Math.floor(Math.random() * (i + 1));
                    if (j !== 9 && i !== 11) {
                        const temp = numbers[i];
                        numbers[i] = numbers[j];
                        numbers[j] = temp;
                    }
                }
            }
            return numbers;
        },
        setBackgroundGray: ele => {
            ele.setNativeProps({style: {backgroundColor: '#ddd'}});
        },
        setBackgroundOrange: ele => {
            ele.setNativeProps({style: {backgroundColor: '#ff6801'}});
        },
    };

    return PinCodeCommon;
})();
