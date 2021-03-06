import React, { Component } from 'react';
import '../../styles/Footer.css';
import { TwitterFollowButton } from 'react-twitter-embed';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import ImportExport from '../functions/ImportExport';
import { version } from '../../utils/constants';

class Footer extends Component {
	state = {};
	render() {
		return (
			<div className="footer">
				<ul>
					<li>
						<p className="made-by">
							<span role="img" aria-label="laptop">
								💻
							</span>
							Version {version || 'x.x.x'}
						</p>
					</li>
					<li>
						<TwitterFollowButton screenName={'matthughes2112'} />
					</li>
					<li>
						<p className="made-by">Contact me for suggestions / bug fixes</p>
					</li>
					<li>
						<p className="made-by">
							<a href="https://github.com/zeepk/wildlife">Github Source</a>
						</p>
					</li>
					<li>
						<Dialog
							header="Export your data or Import to this device!"
							visible={this.state.visible}
							style={{ maxWidth: '500px', width: '90vw' }}
							modal={true}
							onHide={() => this.setState({ visible: false })}
						>
							<ImportExport />
						</Dialog>

						<Button
							label="📂 Import/Export Data"
							className="data-button"
							onClick={(e) => this.setState({ visible: true })}
						/>
					</li>
				</ul>
			</div>
		);
	}
}

export default Footer;
