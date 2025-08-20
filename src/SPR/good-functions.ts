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



// Координатор для круга
function sprGoodProcessCircle(radius: number): {area: number, perimeter: number} {
    if (!isValidCircle(radius)) throw new Error('Invalid circle radius');
       
    return {area: getCircleArea(radius), perimeter: getCirclePerimeter(radius)};
}

// Координатор для прямоугольника
function sprGoodProcessRectangle(width: number, height: number): {area: number, perimeter: number} {
    if (!isValidRectangle(width, height)) throw new Error('Invalid rectangle dimensions');
    
    return {area: getRectangleArea(width, height), perimeter: getRectanglePerimeter(width, height)};
}

// Использование
sprGoodProcessCircle(5);
sprGoodProcessRectangle(4, 6);
