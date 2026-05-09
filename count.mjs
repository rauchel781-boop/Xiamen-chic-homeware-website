import { POSTS } from './data/blog.js';
console.log('Slug                                  | Words');
console.log('--------------------------------------|------');
let total = 0;
POSTS.forEach(p => {
  let text = '';
  p.body.forEach(b => {
    if (b.text) text += ' ' + b.text;
    if (b.items) {
      if (typeof b.items[0] === 'string') text += ' ' + b.items.join(' ');
      else text += ' ' + b.items.map(x => (x.num||'')+' '+(x.label||'')).join(' ');
    }
    if (b.headers) text += ' ' + b.headers.join(' ');
    if (b.rows) text += ' ' + b.rows.flat().join(' ');
    if (b.caption) text += ' ' + b.caption;
  });
  const words = text.split(/\s+/).filter(Boolean).length;
  total += words;
  console.log(p.slug.padEnd(38) + '|' + String(words).padStart(5));
});
console.log('--------------------------------------|------');
console.log('Average per article'.padEnd(38) + '|' + String(Math.round(total/POSTS.length)).padStart(5));
console.log('Total words across 10 articles'.padEnd(38) + '|' + String(total).padStart(5));
