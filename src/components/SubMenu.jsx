import React, { Component } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { Card } from 'primereact/card';
class SubMenu extends Component {
	render() {
		return (
			<Card className="hide-caught">
				<div className="hide-text">Hide Caught</div>
				<InputSwitch
					tooltip="Nice"
					checked={this.props.hideCaught}
					onChange={this.props.changeHide}
				/>
			</Card>
		);
	}
}

export default SubMenu;
