import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import ImportExport from '../functions/ImportExport';
import { landingPageImportExportLabelText } from '../../utils/constants';
import styled from 'styled-components';

const LandingPageImportExport = () => {
	const [visible, setVisible] = useState(false);

	return (
		<ImportExportCard>
			<Dialog
				header="Export your data or Import to this device!"
				visible={visible}
				style={{ maxWidth: '500px', width: '90vw' }}
				modal={true}
				onHide={() => setVisible(false)}
			>
				<ImportExport />
			</Dialog>
			<div className="p-grid">
				<div className="p-col-12 p-sm-6">
					<ImportExportLabel>
						{landingPageImportExportLabelText}
					</ImportExportLabel>
				</div>
				<div className="p-col-12 p-sm-6">
					<Button label="Import/Export Data" onClick={() => setVisible(true)} />
				</div>
			</div>
		</ImportExportCard>
	);
};

export default LandingPageImportExport;

const ImportExportCard = styled.div`
	padding: 10px;
	background-color: var(--blue);
	border-radius: 10px;
`;

const ImportExportLabel = styled.p`
	color: var(--dark-font);
	margin: 0;
`;
