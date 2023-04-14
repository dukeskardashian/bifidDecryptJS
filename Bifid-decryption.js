const polybiusSquare = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I', 'K'],
  ['L', 'M', 'N', 'O', 'P'],
  ['Q', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z']
];

function getIndexInPolybiusSquare(char) {
  char = char.toUpperCase();
  for (let i = 0; i < polybiusSquare.length; i++) {
    const j = polybiusSquare[i].indexOf(char);
    if (j !== -1) {
      return [i, j];
    }
  }
  return null;
}

function bifidDecrypt(ciphertext, key) {
  const ciphertextWithoutSpaces = ciphertext.replace(/\s+/g, '').toUpperCase();
  const keyWithoutSpaces = key.replace(/\s+/g, '').toUpperCase();
  let plaintext = '';

  const keyMatrix = [];
  for (let i = 0; i < keyWithoutSpaces.length; i++) {
    const index = getIndexInPolybiusSquare(keyWithoutSpaces[i]);
    if (index !== null) {
      keyMatrix.push(index);
    }
  }

  const ciphertextIndices = ciphertextWithoutSpaces.split('').map(getIndexInPolybiusSquare).filter(index => index !== null);

  const rows = [];
  const cols = [];
  for (let i = 0; i < ciphertextIndices.length; i++) {
    const index = ciphertextIndices[i];
    rows.push(index[0]);
    cols.push(index[1]);
  }

  const keyIndices = [];
  for (let i = 0; i < rows.length; i++) {
    keyIndices.push(keyMatrix[rows[i]]);
    keyIndices.push(keyMatrix[cols[i]]);
  }

  for (let i = 0; i < keyIndices.length; i += 2) {
    const row = keyIndices[i];
    const col = keyIndices[i + 1];
    plaintext += polybiusSquare[row][col];
  }

  return plaintext;
}
