import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';

const MobileModal = (props) => {
	const [visible, setVisible] = useState(false);
	return (
		<Dialog
			className="mobile-dialog-container"
			header={'test header'}
			visible={visible}
			style={{ width: '50vw', zIndex: 1000 }}
			modal={true}
			onHide={() => setVisible(false)}
		>
			testing
		</Dialog>
	);
};

export default MobileModal;
