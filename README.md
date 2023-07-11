# Talk.jp to 2ch.dat worker
Talk.jpを2ちゃんねる(5ちゃんねる)のDAT形式に変換するCloudflare Workersアプリケーションです。

## ToDo
- [ ] 書き込みに対応
- [ ] subback

## 使い方
次のいずれか(read.cgi or dat)のURL形式に対応しています。

- `https://talk.jp.lain.im/test/read.cgi/<板/board>/<スレッドID/Thread ID>`
  - 例: [`https://talk.jp.lain.im/test/read.cgi/poverty/1688976268`](https://talk.jp.lain.im/test/read.cgi/poverty/1688976268)
- `https://talk.jp.lain.im/<板/board>/dat/<スレッドID/Thread ID>.dat`
  - 例: [`https://talk.jp.lain.im/poverty/dat/1688976268.dat`](https://talk.jp.lain.im/poverty/dat/1688976268.dat)

応答はShift-JISでエンコードされた[2chのdat](https://info.5ch.net/index.php/Monazilla/develop/dat)です。  

URL末尾にクエリパラメータ`?charset=utf-8`を追加するとUTF-8になります。

## その他
- DATのレスポンスは10秒間エッジにキャッシュされる

## Deploy
<!-- [Deploy Button](https://deploy.workers.cloudflare.com/?url=https://github.com/shinosaki/talkjp-to-2ch) or -->

1. `git clone https://github.com/shinosaki/talkjp-to-2ch.git`
2. `cd talkjp-to-2ch`
3. `npm install`
4. `npx wrangler login`
5. Edit `wrangler.toml`
5. `npm run deploy`

## License
[MIT](https://raw.githubusercontent.com/shinosaki/talkjp-to-2ch/main/LICENSE)