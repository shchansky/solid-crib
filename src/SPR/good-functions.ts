// ✅ ХОРОШО: Соблюдение SRP - каждая функция делает что-то одно
//
// 📋 ОСНОВНАЯ ИДЕЯ SRP:
// 1. ✅ ЕДИНСТВЕННАЯ ОТВЕТСТВЕННОСТЬ - каждая функция отвечает за одну задачу
// 2. ✅ ЧЕТКИЕ ГРАНИЦЫ - валидация, расчеты и координация разделены
// 3. ✅ ВЫСОКАЯ СВЯЗНОСТЬ - связанные функции находятся вместе
// 4. ✅ НИЗКАЯ СВЯЗАННОСТЬ - функции не зависят друг от друга
// 5. ✅ ПРОСТОТА ИЗМЕНЕНИЯ - изменение одной функции не влияет на другие
//
// ПРЕИМУЩЕСТВА:
// 1. Каждая функция делает только одну вещь
// 2. Легкость тестирования отдельных компонентов
// 3. Простота понимания и поддержки
// 4. Легкость изменения отдельных частей
// 5. Соблюдение принципа единственной ответственности

// ✅ SRP: Функции с четким разделением ответственностей
// 💡 ПРЕИМУЩЕСТВО: Каждая функция отвечает за одну конкретную задачу
// 🎯 РЕЗУЛЬТАТ: Легкость понимания и тестирования

// ✅ SRP: Только валидация круга
// 💡 ПРЕИМУЩЕСТВО: Одна ответственность - проверка валидности
// 🎯 РЕЗУЛЬТАТ: Легко тестировать и изменять
function isValidCircle(radius?: number): boolean {
    return radius !== undefined && radius > 0;
}

// ✅ SRP: Только валидация прямоугольника
// 💡 ПРЕИМУЩЕСТВО: Одна ответственность - проверка валидности
// 🎯 РЕЗУЛЬТАТ: Легко тестировать и изменять
function isValidRectangle(width?: number, height?: number): boolean {
    return width !== undefined && height !== undefined && width > 0 && height > 0;
}

// ✅ SRP: Только расчет площади круга
// 💡 ПРЕИМУЩЕСТВО: Одна ответственность - математический расчет
// 🎯 РЕЗУЛЬТАТ: Легко тестировать и изменять формулу
function getCircleArea(radius: number): number {
    return Math.PI * radius * radius;
}

// ✅ SRP: Только расчет периметра круга
// 💡 ПРЕИМУЩЕСТВО: Одна ответственность - математический расчет
// 🎯 РЕЗУЛЬТАТ: Легко тестировать и изменять формулу
function getCirclePerimeter(radius: number): number {
    return 2 * Math.PI * radius;
}

// ✅ SRP: Только расчет площади прямоугольника
// 💡 ПРЕИМУЩЕСТВО: Одна ответственность - математический расчет
// 🎯 РЕЗУЛЬТАТ: Легко тестировать и изменять формулу
function getRectangleArea(width: number, height: number): number {
    return width * height;
}

// ✅ SRP: Только расчет периметра прямоугольника
// 💡 ПРЕИМУЩЕСТВО: Одна ответственность - математический расчет
// 🎯 РЕЗУЛЬТАТ: Легко тестировать и изменять формулу
function getRectanglePerimeter(width: number, height: number): number {
    return 2 * (width + height);
}

// ✅ SRP: Координатор для круга - только координация
// 💡 ПРЕИМУЩЕСТВО: Одна ответственность - координация валидации и расчетов
// 🎯 РЕЗУЛЬТАТ: Четкая структура и легкое понимание
function processCircle(radius: number): {area: number, perimeter: number} {
    if (!isValidCircle(radius)) throw new Error('Invalid circle radius');
       
    return {area: getCircleArea(radius), perimeter: getCirclePerimeter(radius)};
}

// ✅ SRP: Координатор для прямоугольника - только координация
// 💡 ПРЕИМУЩЕСТВО: Одна ответственность - координация валидации и расчетов
// 🎯 РЕЗУЛЬТАТ: Четкая структура и легкое понимание
function processRectangle(width: number, height: number): {area: number, perimeter: number} {
    if (!isValidRectangle(width, height)) throw new Error('Invalid rectangle dimensions');
    
    return {area: getRectangleArea(width, height), perimeter: getRectanglePerimeter(width, height)};
}

// ✅ ДЕМОНСТРАЦИЯ ПРЕИМУЩЕСТВ: Четкое разделение ответственностей
// 💡 ПРЕИМУЩЕСТВО: Каждая функция делает только одну вещь
// 🎯 РЕЗУЛЬТАТ: Легкость использования и понимания
const circleParams = processCircle(5);
const rectangleParams = processRectangle(4, 6);

export {}
