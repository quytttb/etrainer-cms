export const isAudioFile = (fileName: string) => {
  const audioExtensions = [".mp3", ".wav", ".ogg", ".m4a", ".aac", ".flac"];
  return audioExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
};
