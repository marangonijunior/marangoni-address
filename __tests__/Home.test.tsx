import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

import Home from "./../src/components/Home";

describe("<Home />", () => {
  const render = () => {
    const component = shallow(<Home />);
    return component;
  };

  it("Should renders the Home component", () => {
    const component = render();
    expect(component.find('[data-test="home"]').exists()).toEqual(true);
  });
});
