import React from 'react';
import { shallow } from "enzyme"
import SignIn from '../Component/SignIn';

describe('signin component', () => {
    const wrapper = shallow(<SignIn/>);
    console.log("In sign in test");
    
    it('debug sign in ', () => {
        
        const component = shallow(<SignIn debug />);
        expect(component).toMatchSnapshot();
    });

    it('checking state', () => {
        expect(wrapper.state('emailId')).toEqual('');
        expect(wrapper.state('password')).toEqual('');
        expect(wrapper.state('showPassword')).toEqual(false);
    })
})