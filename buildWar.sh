#!/bin/bash -x

#npm run build
# does build exist?
if [ ! $(npm run build) ]; then
  echo "Build output not found. Please ensure npm run build is successful."
  exit 1
fi

# Zip dist directory
cd dist
zip -r ../PBI.war *
cd ..

echo "Build and packaging complete. WAR file is located in /home/ec2-user/DSS-powerbi-embed/"
