(function(){
  const FORMSPREE = window.FORMSPREE_ENDPOINT || '';

  function createStatus(node){
    let s = node.querySelector('.contact-status');
    if(!s){ s = document.createElement('p'); s.className='form-status contact-status'; s.setAttribute('aria-live','polite'); node.appendChild(s) }
    return s;
  }

  function showMessage(statusNode, text, ok=true){
    statusNode.textContent = text;
    statusNode.style.color = ok ? '' : '#b91c1c';
  }

  function send(form, data, retries=2){
    if(!FORMSPREE) return Promise.reject(new Error('No endpoint'));
    return fetch(FORMSPREE, { method: 'POST', body: data, headers:{'Accept':'application/json'} }).then(r=>{
      if(!r.ok) throw new Error('submit failed');
      return r.json();
    }).catch(err=>{
      if(retries>0) return new Promise(res=>setTimeout(()=>res(send(form,data,retries-1)), 800));
      throw err;
    });
  }

  function initForm(form){
    if(!form) return;
    const status = createStatus(form.parentNode || form);
    
    const hpName = '__hp';
    if(!form.querySelector(`[name="${hpName}"]`)){
      const hp = document.createElement('input'); hp.type='text'; hp.name=hpName; hp.tabIndex='-1'; hp.autocomplete='off'; hp.style.display='none'; form.appendChild(hp);
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      status.textContent='Sending...';
      const hp = form.querySelector(`[name="${hpName}"]`);
      if(hp && hp.value){ showMessage(status,'Spam detected — submission rejected', false); return }

      const fv = form.checkValidity && form.checkValidity();
      if(fv === false){ showMessage(status,'Please fill required fields and use a valid email.', false); return }


      const data = new FormData(form);
      
      data.append('source', window.location.href);

        
        if (FORMSPREE) {
          send(form, data).then(()=>{
            showMessage(status,'Message sent — thank you!');
            form.reset();
          }).catch(()=>{
            showMessage(status,'Error sending message. Please try again later.', false);
          });
        } else {
          setTimeout(()=>{ showMessage(status,'Message sent — thank you! (local demo)'); form.reset() },700);
        }
    });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('form.contact-form').forEach(initForm);
  });
})();
