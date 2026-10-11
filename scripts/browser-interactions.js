async () => {
  page.setDefaultTimeout(12000);
  const results={};
  await page.setViewportSize({width:1280,height:900});
  await page.goto('http://127.0.0.1:4173/#builder');
  await page.waitForFunction(()=>document.querySelector('.room-identity > span')?.textContent==='Projects' && !document.querySelector('.is-in-transit'));
  results.order=await page.locator('.project-list button').allTextContents();
  await page.getByRole('textbox',{name:'Find a project'}).fill('Medical');
  await page.locator('.project-list button').first().click();
  results.compact=await page.locator('.project-folio').evaluate(e=>({height:e.getBoundingClientRect().height,hasPreview:!!e.querySelector('iframe'),description:!!e.querySelector('.folio-body p')?.textContent}));
  await page.getByRole('textbox',{name:'Find a project'}).fill('');
  await page.locator('.project-list button').first().click();
  await page.locator('.preview-visit').scrollIntoViewIfNeeded();
  results.preview=await page.locator('.live-project-preview').evaluate(e=>({iframe:e.querySelector('iframe')?.getAttribute('src'),noChrome:!e.querySelector('.preview-chrome,.preview-note'),emptyOverlay:!e.querySelector('.preview-visit')?.textContent}));
  const opened=page.waitForEvent('popup'); await page.locator('.preview-visit').click();const popup=await opened;results.previewOpens=popup.url();await popup.close();
  await page.getByRole('button',{name:'Sobi’s Multiverse home'}).click();
  await page.waitForFunction(()=>document.title.startsWith('The universe') && !document.querySelector('.is-in-transit'));
  await page.locator('.cosmic-directory button').filter({hasText:'Projects'}).click();
  await page.waitForFunction(()=>document.querySelector('.room-identity > span')?.textContent==='Projects' && !document.querySelector('.is-in-transit'));
  await page.locator('.world-hop button').filter({hasText:'About Me'}).click();
  await page.waitForFunction(()=>document.querySelector('.room-identity > span')?.textContent==='About Me' && !document.querySelector('.is-in-transit'));
  await page.goBack();await page.waitForFunction(()=>document.title.startsWith('Projects') && !document.querySelector('.is-in-transit'));results.history=true;
  await page.goto('http://127.0.0.1:4173/#research');
  await page.waitForFunction(()=>document.title.startsWith('Research') && !document.querySelector('.is-in-transit'));
  await page.locator('.archive-record summary').first().click();
  results.articleSections=await page.locator('.archive-record[open] .research-prose section').count();
  await page.getByRole('button',{name:'Pause animated backgrounds'}).click();
  results.stillVisible=await page.evaluate(()=>[...document.querySelectorAll('[data-reveal]')].every(e=>e.classList.contains('has-arrived')));
  await page.getByRole('button',{name:'Enable animated backgrounds'}).click();
  await page.goto('http://127.0.0.1:4173/#beyond');await page.waitForFunction(()=>document.title.startsWith('Contact') && !document.querySelector('.is-in-transit'));
  await page.locator('.hyperspeed').waitFor();await page.mouse.move(500,300);await page.mouse.down();results.boostHeld=await page.locator('.hyperspeed').getAttribute('data-boosting');await page.mouse.up();results.boostReleased=await page.locator('.hyperspeed').getAttribute('data-boosting');
  await page.getByRole('button',{name:'Let’s find out'}).click();results.dialog=await page.locator('dialog').evaluate(e=>e.open);await page.keyboard.press('Escape');results.dialogClosed=await page.locator('dialog').evaluate(e=>!e.open);
  results.documents=[];
  for(const name of ['Résumé','Full CV','ATS résumé']) {
    await page.getByRole('button',{name,exact:true}).click();
    await page.waitForFunction(()=>{const c=document.querySelector('.pdf-sheet canvas');return c?.width>0 && !document.querySelector('.pdf-status')?.textContent;});
    results.documents.push(await page.evaluate(()=>({label:document.querySelector('.document-toolbar strong')?.textContent,pages:document.querySelector('.pdf-controls span')?.textContent,fullPage:document.querySelector('.pdf-scroll').clientHeight>=document.querySelector('.pdf-sheet').offsetHeight,download:document.querySelector('[download]')?.getAttribute('download')})));
    if(name==='Full CV'){await page.getByRole('button',{name:'Next PDF page'}).click();await page.waitForFunction(()=>document.querySelector('.pdf-controls span')?.textContent==='Page 2 of 2' && !document.querySelector('.pdf-status')?.textContent);results.cvSecondPage=true;}
  }
  await page.getByRole('button',{name:'Text view',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.document-reader')?.textContent.includes('souradip073@gmail.com'));results.text=true;
  return results;
}
