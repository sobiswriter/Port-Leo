async () => {
  page.setDefaultTimeout(20000);
  const errors=[],failedAssets=[],checks=[];
  page.on('pageerror', error => errors.push(String(error.stack || error)));
  page.on('response', response => {if(response.url().startsWith('http://127.0.0.1:4173/') && response.status()>=400)failedAssets.push({url:response.url(),status:response.status()});});
  const routes=['arrival','builder','ai-lab','research','arsenal','journey','about','beyond'];
  const labels=['Overview','Projects','AI & Experiments','Research & Publications','Technical Skills','Experience & Recognition','About Me','Contact & Résumé'];
  for(const width of [1280,390]) {
    await page.setViewportSize({width,height:900});
    for(const route of routes) {
      await page.goto(`http://127.0.0.1:4173/#${route}`);
      await page.waitForFunction(label => document.querySelector('.room-identity > span')?.textContent===label && !document.querySelector('.is-in-transit'),labels[routes.indexOf(route)]);
      await page.locator('.universe-loading').waitFor({state:'hidden'});
      await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
      await page.waitForTimeout(1000);
      await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
      await page.waitForTimeout(400);
      checks.push(await page.evaluate(({route,width})=>({route,width,title:document.title,overflow:document.documentElement.scrollWidth>innerWidth+1,heading:document.querySelector('.world-shell h1')?.textContent,canvases:document.querySelectorAll('.world-shell canvas').length,blankVisibleSections:[...document.querySelectorAll('.living-page [data-reveal]')].filter(e=>{const b=e.getBoundingClientRect();return !e.closest('details:not([open])') && b.height>0 && b.top<innerHeight && b.bottom>0 && getComputedStyle(e).opacity==='0';}).length}),{route,width}));
    }
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:4173/#about');
  await page.getByRole('button',{name:'Flip profile card'}).waitFor({state:'visible'});
  const reducedMotion=await page.evaluate(()=>({staticCard:!!document.querySelector('.profile-card-static'),atmosphereCanvas:!!document.querySelector('.atmosphere canvas')}));
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('http://127.0.0.1:4173/#/');
  await page.locator('.universe-loading').waitFor({state:'hidden'});
  await page.waitForFunction(()=>document.title.startsWith('The universe') && !document.querySelector('.is-in-transit'));
  const home=await page.evaluate(()=>({canvas:!!document.querySelector('#universe-home canvas'),worlds:document.querySelectorAll('.cosmic-directory button').length,overflow:document.documentElement.scrollWidth>innerWidth+1}));
  return {checks,reducedMotion,home,errors,failedAssets};
}
