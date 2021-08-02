import React from 'react';
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/Print';

export default (props) => {
    const bodyRef = React.createRef();
    const createPdf = () => props.createPdf(bodyRef.current);
    return (
        <section className="pdf-container">
        <section className="pdf-toolbar">
            <div className="btn-print">
                <Button onClick={createPdf} variant="outlined" color="primary" startIcon={<PrintIcon/>}>Print Payments List</Button>
            </div>
        </section>
        <section className="pdf-body" ref={bodyRef}>
            {props.children}
        </section>
        </section>
    )
}