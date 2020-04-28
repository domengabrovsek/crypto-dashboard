# script to build and push docker images for playground server/client

"server", "client" | ForEach-Object -Process {

  # just to be clear what is what
  $name = $_;

  # build the image
  Write-Host "Building image for $name..." -ForegroundColor Cyan;
  Invoke-Expression "docker build -t playground-$name ../docker/$name --no-cache";
  Write-Host "Image for $name built." -ForegroundColor Cyan;

  # tag the image
  Write-Host "Tagging image for $name..." -ForegroundColor Cyan;
  Invoke-Expression "docker tag playground-$name domengabrovsek/playground:$name"
  Write-Host "Image for $name tagged." -ForegroundColor Cyan;

  # push the image to docker hub
  Write-Host "Pushing image for $name to docker hub..." -ForegroundColor Cyan;
  Invoke-Expression "docker push domengabrovsek/playground:$name"
  Write-Host "Image for $name pushed to docker hub." -ForegroundColor Cyan;
}