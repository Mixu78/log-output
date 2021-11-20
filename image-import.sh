export $(cat .env | xargs)

k3d image import "mixu78/log-output-hash:$VERSION" \
					"mixu78/log-output-log:$VERSION" \
					"mixu78/ping-pong:$VERSION"