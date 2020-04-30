import React, { Component } from 'react';
import '../styles/Footer.css';
import { TwitterFollowButton } from 'react-twitter-embed';

class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<ul>
					<li>
						<p className="made-by">💻 Version 1.0</p>
					</li>
					<li>
						<TwitterFollowButton screenName={'matthughes2112'} />
					</li>
					<li>
						<p className="made-by">Contact me for suggestions / bug fixes 😊</p>
					</li>
					<li>
						<p className="made-by">
							<a href="https://github.com/zeepk/wildlife">
								&#60; &#62; Github Source
							</a>
						</p>
					</li>
				</ul>
			</div>
		);
	}
}

export default Footer;
