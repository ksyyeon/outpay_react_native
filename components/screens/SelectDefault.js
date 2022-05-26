import React from 'react';
import {BackHandler, View, Text} from 'react-native';

export default class SelectDefault extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (this.backHandler) this.backHandler.remove();
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.onBackPress.bind(this),
        );
    }

    componentWillUnmount() {
        if (this.backHandler) this.backHandler.remove();
    }

    render() {
        return (
            <View
                syle={{
                    flex: 1,
                }}></View>
        );
    }

    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    };
}
