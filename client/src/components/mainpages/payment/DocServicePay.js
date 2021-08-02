import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
    createPdf = (html) => {
        savePDF(html, { 
            scale:0.6,
            paperSize: 'auto',
            fileName: 'Payments_list.pdf',
            margin: 3
        })
    }
    }

const Doc = new DocService();
export default Doc;