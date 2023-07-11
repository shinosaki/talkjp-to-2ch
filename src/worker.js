import { getThreadJson, jsonToDat } from './thread';
import iconv from '@shinosaki/iconv-lite';
import README from './README.html';

export default {
	async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const charset = url.searchParams.get('charset')?.toLowerCase();

    const cache = await caches.default.match(req);
    if (cache) return cache;

    // Validate URL
    const path = url.pathname.split('/');
    if (path[1] !== 'test' && path[2] !== 'dat') {
      const minified = README
        .replaceAll(/[\n\r]+/gi, '')
        .replaceAll(/>\s+</gi, '><');
        
      const res = new Response(minified, {
        status: 404,
        headers: {
          'content-type': 'text/html',
          'cache-control': 'max-age=86400'
        }
      });
      ctx.waitUntil(caches.default.put(req, res.clone()));
      return res;
    }

    // Parse URL
    const { board, tid } = (url.pathname.split('/')[1] === 'test')
      ? url.pathname.match(/read\.cgi\/(?<board>\w+)\/(?<tid>\d+)/).groups
      : url.pathname.match(/(?<board>\w+)\/dat\/(?<tid>\d+)/).groups;

    const json = await getThreadJson({ board, tid });
    const dat = (charset === 'utf-8')
      ? jsonToDat(json)
      : iconv.encode(jsonToDat(json), 'SJIS');

		const res =  new Response(dat, {
      headers: {
        'content-type': `text/plain; charset=${charset ?? 'shift_jis'}`,
        'cache-control': 'max-age=10'
      },
    });
    ctx.waitUntil(caches.default.put(req, res.clone()));
    return res;
	},
};
