// ✅ ХОРОШО: Соблюдение SRP - каждая функция делает что-то одно

// Валидация круга
function isValidCircle(radius?: number): boolean {
    return radius !== undefined && radius > 0;
}

// Валидация прямоугольника
function isValidRectangle(width?: number, height?: number): boolean {
    return width !== undefined && height !== undefined && width > 0 && height > 0;
}

// Расчет площади круга
function getCircleArea(radius: number): number {
    return Math.PI * radius * radius;
}

// Расчет периметра круга
function getCirclePerimeter(radius: number): number {
    return 2 * Math.PI * radius;
}

// Расчет площади прямоугольника
function getRectangleArea(width: number, height: number): number {
    return width * height;
}

// Расчет периметра прямоугольника
function getRectanglePerimeter(width: number, height: number): number {
    return 2 * (width + height);
}

// Сохранение круга
function saveCircle(radius: number, area: number, perimeter: number): void {
    console.log(`Saving circle: radius=${radius}, area=${area.toFixed(2)}, perimeter=${perimeter.toFixed(2)}`);
}

// Сохранение прямоугольника
function saveRectangle(width: number, height: number, area: number, perimeter: number): void {
    console.log(`Saving rectangle: width=${width}, height=${height}, area=${area}, perimeter=${perimeter}`);
}

// Отображение круга
function showCircle(radius: number, area: number, perimeter: number): void {
    console.log(`Circle: radius=${radius} -> Area: ${area.toFixed(2)}, Perimeter: ${perimeter.toFixed(2)}`);
}

// Отображение прямоугольника
function showRectangle(width: number, height: number, area: number, perimeter: number): void {
    console.log(`Rectangle: ${width}x${height} -> Area: ${area}, Perimeter: ${perimeter}`);
}

// Координатор для круга
function processCircle(radius: number): void {
    if (!isValidCircle(radius)) throw new Error('Invalid circle radius');
    
    const area = getCircleArea(radius);
    const perimeter = getCirclePerimeter(radius);
    
    saveCircle(radius, area, perimeter);
    showCircle(radius, area, perimeter);
}

// Координатор для прямоугольника
function processRectangle(width: number, height: number): void {
    if (!isValidRectangle(width, height)) throw new Error('Invalid rectangle dimensions');
    
    const area = getRectangleArea(width, height);
    const perimeter = getRectanglePerimeter(width, height);
    
    saveRectangle(width, height, area, perimeter);
    showRectangle(width, height, area, perimeter);
}

// Использование
processCircle(5);
processRectangle(4, 6);
