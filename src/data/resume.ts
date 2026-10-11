export const RESUME_DOCUMENTS = [
  {id:'resume', label:'Résumé', description:'A concise overview of my work and experience.', filename:'Souradip_Biswas_Resume.pdf'},
  {id:'cv', label:'Full CV', description:'Projects, applied AI, education, training, and recognition.', filename:'Souradip_Biswas_CV.pdf'},
  {id:'ats', label:'ATS résumé', description:'A straightforward format for recruitment systems.', filename:'Souradip_Biswas_Resume_ATS.pdf'},
].map(doc=>({...doc,url:new URL(`documents/${doc.filename}`,document.baseURI).href}));
