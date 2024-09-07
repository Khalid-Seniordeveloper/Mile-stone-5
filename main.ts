import { jsPDF } from 'jspdf';

document.addEventListener('DOMContentLoaded', () => {
    const profileImageInput = document.getElementById('image-upload');
    const profileImage = document.getElementById('profile-image');
    const generatePdfButton = document.getElementById('generate-pdf');

    let imageDataURL: string | null = null;

    if (profileImageInput && profileImageInput instanceof HTMLInputElement) {
        profileImageInput.addEventListener('change', (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const file = target.files[0];
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    if (e.target?.result) {
                        if (profileImage && profileImage instanceof HTMLImageElement) {
                            profileImage.src = e.target.result as string;
                        }
                        imageDataURL = e.target.result as string;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (generatePdfButton && generatePdfButton instanceof HTMLButtonElement) {
        generatePdfButton.addEventListener('click', () => {
            const fields = [
                'first-name', 'last-name', 'contact', 'email', 'city',
                'degree', 'institution', 'graduation-year',
                'job-title', 'company', 'experience-years',
                'skills'
            ];

            let allFilled = true;
            fields.forEach(id => {
                const element = document.getElementById(id);
                if (element && element instanceof HTMLInputElement) {
                    const value = element.value.trim();
                    if (!value) {
                        allFilled = false;
                    }
                } else {
                    allFilled = false;
                }
            });

            if (!allFilled) {
                alert('Please fill out all fields before generating the PDF.');
                return;
            }

            const doc = new jsPDF();

            if (imageDataURL) {
                doc.addImage(imageDataURL, 'PNG', 10, 10, 50, 50);
            }

            doc.setFontSize(18);
            doc.text('Resume', 10, 70);
            doc.setFontSize(12);
            const firstName = (document.getElementById('first-name') as HTMLInputElement).value;
            const lastName = (document.getElementById('last-name') as HTMLInputElement).value;
            doc.text(`Name: ${firstName} ${lastName}`, 10, 80);
            doc.text(`Contact: ${(document.getElementById('contact') as HTMLInputElement).value}`, 10, 90);
            doc.text(`Email: ${(document.getElementById('email') as HTMLInputElement).value}`, 10, 100);
            doc.text(`City: ${(document.getElementById('city') as HTMLInputElement).value}`, 10, 110);
            doc.text('Education', 10, 120);
            doc.text(`Degree: ${(document.getElementById('degree') as HTMLInputElement).value}`, 10, 130);
            doc.text(`Institution: ${(document.getElementById('institution') as HTMLInputElement).value}`, 10, 140);
            doc.text(`Year of Graduation: ${(document.getElementById('graduation-year') as HTMLInputElement).value}`, 10, 150);
            doc.text('Working Experience', 10, 160);
            doc.text(`Job Title: ${(document.getElementById('job-title') as HTMLInputElement).value}`, 10, 170);
            doc.text(`Company: ${(document.getElementById('company') as HTMLInputElement).value}`, 10, 180);
            doc.text(`Years of Experience: ${(document.getElementById('experience-years') as HTMLInputElement).value}`, 10, 190);
            doc.text('Skills', 10, 200);
            doc.text(`Skills: ${(document.getElementById('skills') as HTMLInputElement).value}`, 10, 210);

            const existingViewButton = document.getElementById('view-button');
            if (existingViewButton) {
                existingViewButton.remove();
            }

            const existingDownloadButton = document.getElementById('download-button');
            if (existingDownloadButton) {
                existingDownloadButton.remove();
            }

            const viewButton = document.createElement('button');
            viewButton.id = 'view-button';
            viewButton.className = 'btn btn-success';
            viewButton.textContent = 'View PDF';
            viewButton.onclick = () => {
                const pdfBlob = doc.output('blob');
                const url = URL.createObjectURL(pdfBlob);
                window.open(url, '_blank');
            };

            const downloadButton = document.createElement('button');
            downloadButton.id = 'download-button';
            downloadButton.className = 'btn btn-primary';
            downloadButton.textContent = 'Download PDF';
            downloadButton.onclick = () => {
                doc.save('resume.pdf');
            };

            document.body.appendChild(viewButton);
            document.body.appendChild(downloadButton);
        });
    }
});