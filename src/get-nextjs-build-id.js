export const getBuildId = () => {
  const url = 'https://talk.jp/';

  return fetch(url).then(r => {
    const reader = r.body.getReader();

    const regex = /_next\/static\/(?<id>[\w-]+)\/_buildManifest.js/i;
    let result = '';

    const processResult = chunk => {
      result += new TextDecoder().decode(chunk.value);

      const id = result.match(regex)?.groups.id ?? null;

      if (id) return id;

      return reader.read().then(processResult);
    };

    return reader.read().then(processResult);
  })
};
