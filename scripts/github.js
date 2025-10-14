(function(){
  const DEFAULT_USER = '';
  const user = (window.GITHUB_USERNAME || DEFAULT_USER).trim();
  const container = document.getElementById('repos');
  if(!container) return;
  if(!user) return;

  if(container.getAttribute('data-static') === 'true') return;

  const api = `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`;
  fetch(api).then(r=>{
    if(!r.ok) throw new Error('GitHub API error');
    return r.json();
  }).then(repos=>{
  
  const isStatic = container.getAttribute('data-static') === 'true';
  if(!isStatic) container.innerHTML = '';
    const inferred = {};
    const keywords = [
      ['react', 'React'], ['next', 'Next.js'], ['vue', 'Vue'], ['angular', 'Angular'],
      ['node', 'Node.js'], ['express', 'Express'], ['django', 'Django'], ['flask', 'Flask'],
      ['python', 'Python'], ['typescript', 'TypeScript'], ['tailwind', 'Tailwind CSS'],
      ['css', 'CSS'], ['html', 'HTML'], ['cli', 'CLI'], ['rust', 'Rust'], ['go', 'Go']
    ];

  function bump(skill){ inferred[skill] = (inferred[skill]||0)+1 }

    repos.forEach(repo=>{
      
      const repoSelector = `[data-repo*="${repo.name}"]`;
      const existing = container.querySelectorAll(repoSelector);
      if(existing && existing.length>0){
        existing.forEach(node=>{
          node.setAttribute('data-stars', repo.stargazers_count || 0);
          node.setAttribute('data-updated', repo.updated_at || '');
          
          if(!node.querySelector('.repo-meta')){
            const meta = document.createElement('div');
            meta.className = 'repo-meta';
            meta.innerHTML = `⭐ <span class="stars">${repo.stargazers_count||0}</span> • <span class="updated">${new Date(repo.updated_at).toLocaleDateString()}</span>`;
            node.appendChild(meta);
          }
        });
        
      } else if(!isStatic){
        
        const card = document.createElement('article');
        card.className = 'project-card';
        const title = document.createElement('h4'); title.textContent = repo.name;
        const desc = document.createElement('p'); desc.textContent = repo.description || 'No description';
        const a = document.createElement('a'); a.className='button'; a.href = repo.html_url; a.target='_blank'; a.rel='noopener'; a.textContent = 'View repo';
        const meta = document.createElement('div'); meta.className='repo-meta'; meta.innerHTML = `⭐ <span class="stars">${repo.stargazers_count||0}</span> • <span class="updated">${new Date(repo.updated_at).toLocaleDateString()}</span>`;
        card.appendChild(title); card.appendChild(desc); card.appendChild(meta); card.appendChild(a);
        container.appendChild(card);
      }

      
      if(repo.language) bump(repo.language);

      
      const hay = (repo.name + ' ' + (repo.description||'')).toLowerCase();
      keywords.forEach(([k,label])=>{ if(hay.includes(k)) bump(label) });
    });

    
    const skillsNode = document.getElementById('inferred-skills');
    if(skillsNode){
      
      const list = Object.keys(inferred).map(k=>({name:k,count:inferred[k]})).sort((a,b)=>b.count-a.count);
      if(list.length===0){
        skillsNode.textContent = 'No public repositories detected or unable to infer skills.';
      } else {
        skillsNode.innerHTML = '';
        list.forEach(s=>{
          const span = document.createElement('span');
          span.className = 'skill-badge';
          span.textContent = `${s.name} (${s.count})`;
          skillsNode.appendChild(span);
        });
      }
    }
  }).catch(err=>{
    console.error(err);
    
  });
})();