import React, { useState } from 'react';
import { Button } from 'primereact/button';
import Grid from '@material-ui/core/Grid';
import { InputText } from 'primereact/inputtext';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const ImportExport = () => {
	const [text, setText] = useState('');
	const [open, setOpen] = React.useState(false);

	function copyToClipboard(text) {
		var dummy = document.createElement('textarea');
		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		document.execCommand('copy');
		document.body.removeChild(dummy);
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	const exportData = () => {
		copyToClipboard(JSON.stringify(localStorage));

		setOpen(true);
	};
	const importData = () => {
		if (!text) {
			alert('No text entered');
			return;
		}
		try {
			var data = JSON.parse(text);
			Object.keys(data).forEach(function (k) {
				localStorage.setItem(k, data[k]);
			});
			window.location.reload(false);
		} catch (err) {
			alert(
				'Error parsing data 😢 Please check your formatting and try again.'
			);
		}
	};

	return (
		<Grid
			className="import-export-grid"
			container
			spacing={3}
			style={{ padding: '10px' }}
		>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={open}
				autoHideDuration={2000}
				onClose={handleClose}
				message="Data Copied to Clipboard"
				action={
					<React.Fragment>
						<IconButton
							size="small"
							aria-label="close"
							color="inherit"
							onClick={handleClose}
						>
							<CloseIcon fontSize="small" />
						</IconButton>
					</React.Fragment>
				}
			/>
			<Grid className="import-export-grid-item" item sm={6} xs={12}>
				<Button
					label="Import"
					className="p-button-success p-button-raised p-button-rounded"
					onClick={importData}
				/>
			</Grid>
			<Grid className="import-export-grid-item" item sm={6} xs={12}>
				<InputText value={text} onChange={(e) => setText(e.target.value)} />
			</Grid>
			<Grid className="import-export-grid-item" item sm={6} xs={12}>
				<Button
					label="Export"
					className="p-button-raised p-button-rounded"
					onClick={exportData}
				/>
			</Grid>
			<Grid className="import-export-grid-item" item sm={6} xs={12}></Grid>
		</Grid>
	);
};

export default ImportExport;
