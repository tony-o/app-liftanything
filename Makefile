_: emulator
	cordova run android

emulator: kill-emulator
	__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia __VK_LAYER_NV_optimus=NVIDIA_only $(HOME)/Android/Sdk/emulator/emulator -avd Pixel_9_Stable

kill-emulator:
	-pkill -f "qemu-system-x86_64 -avd Pixel_9_2" 2>/dev/null
	@sleep 2

device:
	cordova run android --device
