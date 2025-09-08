// ✅ ХОРОШО: Соблюдение SRP - каждая функция делает что-то одно
//
// 1. ✅ ЕДИНСТВЕННАЯ ОТВЕТСТВЕННОСТЬ - каждая функция отвечает за одну задачу
// 2. ✅ ЧЕТКИЕ ГРАНИЦЫ - валидация, расчеты и координация разделены
// 3. ✅ ВЫСОКАЯ СВЯЗНОСТЬ - связанные функции находятся вместе
// 4. ✅ НИЗКАЯ СВЯЗАННОСТЬ - функции не зависят друг от друга
// 5. ✅ ПРОСТОТА ИЗМЕНЕНИЯ - изменение одной функции не влияет на другие

// ✅ SRP: Только валидация круга
function isValidCircle(radius?: number): boolean {
    return radius !== undefined && radius > 0;
}

// ✅ SRP: Только валидация прямоугольника
function isValidRectangle(width?: number, height?: number): boolean {
    return width !== undefined && height !== undefined && width > 0 && height > 0;
}

// ✅ SRP: Только расчет площади круга
function getCircleArea(radius: number): number {
    return Math.PI * radius * radius;
}

// ✅ SRP: Только расчет периметра круга
function getCirclePerimeter(radius: number): number {
    return 2 * Math.PI * radius;
}

// ✅ SRP: Только расчет площади прямоугольника
function getRectangleArea(width: number, height: number): number {
    return width * height;
}

// ✅ SRP: Только расчет периметра прямоугольника
function getRectanglePerimeter(width: number, height: number): number {
    return 2 * (width + height);
}

// ✅ SRP: Координатор для круга - только координация
function processCircle(radius: number): {area: number, perimeter: number} {
    if (!isValidCircle(radius)) throw new Error('Invalid circle radius');
       
    return {area: getCircleArea(radius), perimeter: getCirclePerimeter(radius)};
}

// ✅ SRP: Координатор для прямоугольника - только координация
function processRectangle(width: number, height: number): {area: number, perimeter: number} {
    if (!isValidRectangle(width, height)) throw new Error('Invalid rectangle dimensions');
    
    return {area: getRectangleArea(width, height), perimeter: getRectanglePerimeter(width, height)};
}

// ✅ ДЕМОНСТРАЦИЯ ПРЕИМУЩЕСТВ: Четкое разделение ответственностей
const circleParams = processCircle(5);
const rectangleParams = processRectangle(4, 6);

export {}
