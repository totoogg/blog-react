import { rm } from "fs";
import { join } from "path";

const cachePath = join("node_modules", ".cache");

rm(cachePath, { recursive: true }, (err) => {
  if (err) {
    console.error("Error remove cache:", err);
  } else {
    console.log("Success remove cache");
  }
});
