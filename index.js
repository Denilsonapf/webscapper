const { remote } = require('webdriverio');
const http = require('http');
const fs = require('fs');
let browser

;(async () => {
    browser = await remote({
        capabilities: { browserName: 'chrome' }
    })
    //-----------------------Iniciando a Navegação Autonoma----------------------------
    await browser.navigateTo('http://www.ans.gov.br/prestadores/tiss-troca-de-informacao-de-saude-suplementar')

    
    const searchBtn = await browser.findElement('css selector', 'a[class="alert-link"]')
    
    await browser.elementClick(searchBtn['element-6066-11e4-a52e-4f735466cecf'])
    const searchBtn2 = await browser.findElement('css selector', 'a[class="btn btn-primary btn-sm center-block"]')
    await browser.elementClick(searchBtn2['element-6066-11e4-a52e-4f735466cecf'])
//--------------------------Baixando o Arquivo como PDF e encerrando a navegação-----------------------/   
    setTimeout(async () => {
        const adress = await browser.getUrl();
        const file = fs.createWriteStream("Padrão_TISS_Componente_Organizacional_202103.pdf")
        const request = http.get(adress, function(response){
        response.pipe(file);
    });
    await browser.deleteSession()
    },40000)
    
   

    
})().catch((err) => {
    console.error(err)
    return browser.deleteSession()
})

