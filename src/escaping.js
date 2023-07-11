export const escaping = raw => {
  // https://stackoverflow.com/a/6234804
  return raw.replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;')
            .replaceAll('\n', '<br>');
};