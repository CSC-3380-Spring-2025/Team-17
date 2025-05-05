import React from "react";
import renderer from 'react-test-renderer';
import Reward from "@/components/Reward";

describe('reward', () => {
    test('renders successfully', () => {
        const tree = renderer.create(<Reward reward={5}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});