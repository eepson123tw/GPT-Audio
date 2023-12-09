// @ts-nocheck
// const fs = require("fs");
// const ytdl = require("ytdl-core");

const youtubeBtn = document.getElementById("youtube-btn");
const youtubeGroup = document.querySelector(".youtube-group");
const link = document.getElementById("youtube-link");
function validate(thing, notURL) {
  var title = thing
    .split("?")
    .join("？")
    .split(":")
    .join(";")
    .split("/")
    .join("／")
    .split("*")
    .join("＊")
    .split("\\")
    .join("＼")
    .split("|")
    .join("｜")
    .split(`"`)
    .join("'")
    .split(`<`)
    .join("＜")
    .split(`>`)
    .join(">");

  return notURL ? title : new URLSearchParams({ title }).toString();
}
const videos = [];
const youtubeDownLoader = async () => {
  try {
    axios
      .get(
        "https://a2vo2d.laf.dev/get-youtube",
        {
          params: {
            url: link.value,
          },
        },
        {
          headers: {
            "Content-Type": " application/json",
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const videoData =
          response.data.formats[response.data.formats.length - 1];
        const video = document.createElement("video");
        video.src = videoData.url;
        video.controls = true;
        video.playsInline = true;
        video.width = "320";
        video.height = "240";
        youtubeGroup.appendChild(video);
        videos.push(video);
      });
  } catch (e) {
    console.error("Download failed:", e);
  }
};

youtubeBtn.addEventListener("click", youtubeDownLoader);
