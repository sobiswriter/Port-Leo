async () => {
  page.setDefaultTimeout(20000);
  const warnings=[],errors=[],results=[];
  page.on('console',message=>{if(message.text().includes('Too many active WebGL'))warnings.push(message.text());if(message.type()==='error' && message.location().url.startsWith('http://127.0.0.1:4173/'))errors.push(message.text());});
  page.on('pageerror',error=>errors.push(String(error)));
  await page.addInitScript(()=>{window.__activeContexts=new Set();const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){const gl=original.call(this,type,...args);if(gl && /webgl/i.test(type) && !window.__activeContexts.has(gl)){window.__activeContexts.add(gl);this.addEventListener('webglcontextlost',()=>window.__activeContexts.delete(gl));}return gl;};});
  await page.goto('http://127.0.0.1:4173/?render-check=1#arrival');
  const routes=['arrival','builder','ai-lab','research','arsenal','journey','about','beyond'];
  const labels=['Overview','Projects','AI & Experiments','Research & Publications','Technical Skills','Experience & Recognition','About Me','Contact & Résumé'];
  for(let i=0;i<routes.length;i++) {
    if(i)await page.goto('http://127.0.0.1:4173/?render-check=1#'+routes[i]);
    await page.waitForFunction(label=>document.querySelector('.room-identity > span')?.textContent===label && !document.querySelector('.is-in-transit'),labels[i]);
    await page.locator('.universe-loading').waitFor({state:'hidden'});
    await page.getByRole('button',{name:'Atmosphere',exact:true}).click();
    const choices=await page.locator('.atmosphere-settings > button').count();
    for(let variant=0;variant<choices;variant++){
      await page.locator('.atmosphere-settings > button').nth(variant).click();
      await page.waitForTimeout(450);
      results.push(await page.evaluate(({route,variant})=>({route,variant,canvas:!!document.querySelector('.atmosphere canvas'),activeContexts:window.__activeContexts.size,galaxyFallback:!!document.querySelector('.cosmic-fallback')}),{route:routes[i],variant}));
    }
  }
  await page.goto('http://127.0.0.1:4173/?render-check=1#/');await page.waitForFunction(()=>document.title.startsWith('The universe')&&!document.querySelector('.is-in-transit'));await page.waitForTimeout(500);
  const home=await page.evaluate(()=>({activeContexts:window.__activeContexts.size,fallback:!!document.querySelector('.cosmic-fallback')}));
  return {variants:results,warnings,errors,home};
}
