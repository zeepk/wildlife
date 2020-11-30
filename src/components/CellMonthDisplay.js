import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const CellMonthDisplay = (rowData, columnData) => {
	if (rowData.monthArrayNorth.includes(columnData.monthNumber)) {
		return (
			<CheckCircleIcon
				style={{ color: 'green', fontSize: '30px', zIndex: '' }}
			/>
		);
	} else {
		return;
	}
};

export default CellMonthDisplay;
