@echo off
echo Optimizing images for web use...
echo.

REM Check if ImageMagick is installed
magick -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ImageMagick is not installed. Please install it from https://imagemagick.org/
    echo Or use an online tool like https://tinypng.com/ to compress your images
    echo.
    echo Target sizes for web:
    echo - Gallery images: max 800x600 pixels, under 200KB
    echo - Headshot: max 400x400 pixels, under 100KB
    echo.
    pause
    exit /b 1
)

echo Compressing gallery images...
magick "client_photo_1.jpg" -resize 800x600^> -quality 85 "client_photo_1_web.jpg"
magick "client_photo_2.jpg" -resize 800x600^> -quality 85 "client_photo_2_web.jpg"
magick "client_photo_4.jpg" -resize 800x600^> -quality 85 "client_photo_4_web.jpg"
magick "client_photo_7.jpg" -resize 800x600^> -quality 85 "client_photo_7_web.jpg"
magick "client_photo_8.jpg" -resize 800x600^> -quality 85 "client_photo_8_web.jpg"
magick "client_photo_9.jpg" -resize 800x600^> -quality 85 "client_photo_9_web.jpg"

echo Compressing headshot...
magick "miriam_headshot.jpg" -resize 400x400^> -quality 85 "miriam_headshot_web.jpg"

echo.
echo Optimization complete! Web-optimized images created with _web suffix.
echo You can now replace the original images with these optimized versions.
echo.
pause
