import 'ninja-keys';
import 'katex';

import autoRenderMath from 'katex/contrib/auto-render';

function partition(array, isValid) {
 return array.reduce(([pass, fail], elem) => {
  return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
 }, [[], []]);
}

window.addEventListener("load", (event) => {
 autoRenderMath(document.body)

 const openAllDetailsAbove = elt => {
  while (elt != null) {
   if (elt.nodeName == 'DETAILS') {
    elt.open = true
   }

   elt = elt.parentNode;
  }
 }

 const jumpToSubtree = evt => {
  if (evt.target.tagName === "A") {
   return;
  }

  const link = evt.target.closest('span[data-target]')
  const selector = link.getAttribute('data-target')
  const tree = document.querySelector(selector)
  openAllDetailsAbove(tree)
  window.location = selector
 }

 [...document.querySelectorAll("[data-target^='#']")].forEach(
  el => el.addEventListener("click", jumpToSubtree)
 );

 const ninja = document.querySelector('ninja-keys');
 const baseUrl = document.querySelector('html').getAttribute('data-base-url') || '/';
 const jsonUrl = `${baseUrl}forest.json`

 fetch(jsonUrl)
  .then((res) => res.json())
  .then((trees) => {
   const items = []

   const editIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>'
   const bookmarkIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M120-40v-700q0-24 18-42t42-18h480q24 0 42.5 18t18.5 42v700L420-167 120-40Zm60-91 240-103 240 103v-609H180v609Zm600 1v-730H233v-60h547q24 0 42 18t18 42v730h-60ZM180-740h480-480Z"/></svg>'

   if (window.sourcePath) {
    items.push({
     id: 'edit',
     title: 'Edit current tree in Visual Studio Code',
     section: 'Commands',
     hotkey: 'cmd+e',
     icon: editIcon,
     handler: () => {
      window.location.href = `vscode://file/${window.sourcePath}`
     }
    })
   }

   const isTopTree = (item) => {
    return item.tags ? item.tags.includes('top') : false
   }

   const uriMap = new Map();
   trees.forEach(item => {
    if (item.uri) {
     uriMap.set(item.uri, item);
    }
   });

   const addItemToSection = (item, section, icon) => {
    const title =
     item.taxon
      ? (item.title ? `${item.taxon}. ${item.title}` : item.taxon)
      : (item.title ? item.title : "Untitled")
    const fullTitle = `${title} [${item.uri}]`
    items.push({
     id: item.uri,
     title: fullTitle,
     keywords: item.tags ? item.tags.join(' ') : '',
     section: section,
     icon: icon,
     handler: () => {
      window.location.href = item.route
     }
    })
   }

   const [top, rest] = partition(trees, isTopTree)
   top.forEach((item) => addItemToSection(item, "Top Trees", bookmarkIcon))
   rest.forEach((item) => addItemToSection(item, "All Trees", null))

   ninja.data = items

   // Map data-tags onto DOM sections for /proj/ filtering
   document.querySelectorAll('article section.block').forEach(sec => {
    const slugLink = sec.querySelector('a.slug') || sec.querySelector('header a[href]');
    if (!slugLink) return;

    let uri = '';
    const href = slugLink.getAttribute('href') || '';
    const text = slugLink.textContent || '';

    const match = href.match(/\/([^\/]+)\/?$/) || text.match(/\[(.*?)\]/);
    if (match && match[1]) {
     uri = match[1];
    }

    if (!uri || uri === 'projects' || uri === 'publications' || uri === 'proj' || uri === 'index') return;

    const itemData = uriMap.get(uri);
    if (itemData && itemData.tags && itemData.tags.length) {
     sec.setAttribute('data-tags', itemData.tags.join(' '));
    }
   });
  });

 let activeTag = 'all';
 document.addEventListener('click', (e) => {
  const link = e.target.closest('.tag-filter-link');
  if (!link) return;
  const tag = link.getAttribute('data-tag');
  if (!tag) return;

  if (tag === 'all' || activeTag === tag) {
   activeTag = 'all';
   document.querySelectorAll('.tag-filter-link').forEach(c => {
    if (c.getAttribute('data-tag') === 'all') {
     c.classList.add('active');
    } else {
     c.classList.remove('active');
    }
   });
   document.querySelectorAll('section[data-tags]').forEach(sec => sec.style.display = '');
  } else {
   activeTag = tag;
   document.querySelectorAll('.tag-filter-link').forEach(c => {
    if (c.getAttribute('data-tag') === tag) {
     c.classList.add('active');
    } else {
     c.classList.remove('active');
    }
   });
   document.querySelectorAll('section[data-tags]').forEach(sec => {
    const tagsAttr = sec.getAttribute('data-tags') || '';
    if (tagsAttr.includes(tag)) {
     sec.style.display = '';
    } else {
     sec.style.display = 'none';
    }
   });
  }
 });
});
