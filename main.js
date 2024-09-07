document.addEventListener('DOMContentLoaded', () => {
    const profileImageInput = document.getElementById('image-upload');
    const profileImage = document.getElementById('profile-image');
    const generatePdfButton = document.getElementById('generate-pdf');
    let imageDataURL = null;

    if (profileImageInput) {
        profileImageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
   if (file) {
        const reader = new FileReader();
              reader.onload = function(e) {
                    if (profileImage) {
                           profileImage.src = e.target.result;      }
                    imageDataURL = e.target.result;
                };
                 reader.readAsDataURL(file);
            }
        });
    }

    if (generatePdfButton) {
        generatePdfButton.addEventListener('click', () => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
          
          
          
            const fields = [
                'first-name', 'last-name', 'contact', 'email', 'city',
                'degree', 'institution', 'graduation-year',
      'job-title', 'company', 'experience-years',
                'skills'
            ];

            let allFilled = true;
            fields.forEach(id => {
                const value = document.getElementById(id).value.trim();
         if (!value) {
                    allFilled = false;
                }
             });
//  agr koi field empty ho to error dega 
            if (!allFilled) {
                 alert('Please fill out all fields before generating the PDF.');
               // function se baher ajana jnaab jab value filled na ho
                 return; 
     }
   
            if (imageDataURL) {
                doc.addImage(imageDataURL, 'PNG', 10, 10, 50, 50); }

            doc.setFontSize(18);
            doc.text('Resume', 10, 70);
            doc.setFontSize(12);
            doc.text(`Name: ${document.getElementById('first-name').value} ${document.getElementById('last-name').value}`, 10, 80);
            doc.text(`Contact: ${document.getElementById('contact').value}`, 10, 90);
       doc.text(`Email: ${document.getElementById('email').value}`, 10, 100);
            doc.text(`City: ${document.getElementById('city').value}`, 10, 110);
         doc.text('Education', 10, 120);
  doc.text(`Degree: ${document.getElementById('degree').value}`, 10, 130);
               doc.text(`Institution: ${document.getElementById('institution').value}`, 10, 140);
            doc.text(`Year of Graduation: ${document.getElementById('graduation-year').value}`, 10, 150);
            doc.text('Working Experience', 10, 160);
      doc.text(`Job Title: ${document.getElementById('job-title').value}`, 10, 170);
             doc.text(`Company: ${document.getElementById('company').value}`, 10, 180);
     doc.text(`Years of Experience: ${document.getElementById('experience-years').value}`, 10, 190);
             doc.text('Skills', 10, 200);
         doc.text(`Skills: ${document.getElementById('skills').value}`, 10, 210);

      const pdfBlob = doc.output('blob');
             const url = URL.createObjectURL(pdfBlob);

        //  pdf update bh hogi yahan 
   const pdfViewer = document.getElementById('pdf-viewer');
      if (pdfViewer) {
            pdfViewer.innerHTML = ''; // Clear previous content
                  const iframe = document.createElement('iframe');
           iframe.src = url;
                iframe.width = '100%';
                     iframe.height = '100%';
                pdfViewer.appendChild(iframe); }

        //   agr 1 se ziada  bar update ho but phr bh button 1 bar render ho bar bar na ho 
            const existingViewButton = document.getElementById('view-button');
        if (existingViewButton) {
                        existingViewButton.remove();
            }
              const existingDownloadButton = document.getElementById('download-button');
      if (existingDownloadButton) {
             existingDownloadButton.remove();
                }
// live link ke button ka manjan ye rha 
                 const viewButton = document.createElement('button');
viewButton.id = 'view-button';
              viewButton.className = 'btn btn-success';
                     viewButton.textContent = 'View PDF Live';
             viewButton.onclick = () => {
          const pdfBlob = doc.output('blob');
                 const url = URL.createObjectURL(pdfBlob);
               window.open(url, '_blank');
            };

// d ownload button ka manjan
                 const downloadButton = document.createElement('button');
            downloadButton.id = 'download-button';
      downloadButton.className = 'btn btn-primary';
            downloadButton.textContent = 'Download PDF';
              downloadButton.onclick = () => {
                   doc.save('resume.pdf');};

        // button hojaengy janab ab render or kaam khtm 
            document.body.appendChild(viewButton);


             document.body.appendChild(downloadButton);
        });
    }
});