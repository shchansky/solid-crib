// ❌ ПЛОХО: Нарушение LSP - функции-обертки не могут заменить базовую функцию
//
// ПРОБЛЕМЫ:
// 1. Нарушение контракта - функции должны работать как processRectangle, но работают по-другому
// 2. Нарушение принципа подстановки - функции не могут быть взаимозаменяемы
// 3. Неожиданное поведение - функции интерпретируют параметры по-разному
// 4. Сложность тестирования - нужно тестировать каждую функцию отдельно
// 5. Нарушение полиморфизма - код должен знать конкретную функцию


// ✅ Базовая функция с четким контрактом - аналог LspBadShape.
function baseProcessShape(width: number, height: number): { area: number; perimeter: number; info: string } {
    // Контракт: width и height - это размеры прямоугольника
    return {
        area: width * height,           // Площадь = ширина × высота
        perimeter: 2 * (width + height), // Периметр = 2 × (ширина + высота)
        info: `Rectangle: ${width}x${height}` // Информация о прямоугольнике
    };
}

// ✅ Функция не нарушает LSP- квадрат, такой же прямоугольник
const processSquare: typeof baseProcessShape = (width: number, height: number): { area: number; perimeter: number; info: string } => {
    return {
        area: width * height, 
        perimeter: 2 * (width + height), // Периметр = 2 × (ширина + высота)
        info: `Rectangle: ${width}x${height}` // Информация о прямоугольнике
    };
}

// ❌ НАРУШЕНИЕ LSP: Функция должна работать как processRectangle, но работает по-другому
// Суть нарушения LSP - функция имеют одинаковую baseProcessShape, но у нее другое поведение
const processCircle: typeof baseProcessShape = (width: number, height: number) => {
    // ❌ Нарушение контракта processRectangle:
    // - width интерпретируется как radius
    // - height игнорируется
    // - формулы не соответствуют прямоугольнику
    const radius = width;
    return {
        area: Math.PI * radius * radius,     // ❌ Не width * height
        perimeter: 2 * Math.PI * radius,     // ❌ Не 2 * (width + height)
        info: `Circle: radius=${radius}`     // ❌ Не `Rectangle: ${width}x${height}`
    };
};

// ❌ НАРУШЕНИЕ LSP: Функция должна работать как processRectangle, но работает по-другому
// Суть нарушения LSP - функция имеют одинаковую baseProcessShape, но у нее другое поведение
const processTriangle: typeof baseProcessShape = (width: number, height: number) => {
    // ❌ Нарушение контракта processRectangle:
    // - width и height интерпретируются как стороны треугольника
    // - используется формула Герона вместо простого умножения
    // - периметр вычисляется как сумма сторон, а не 2 × (ширина + высота)
    const side1 = width;
    const side2 = height;
    const side3 = width; // Предполагаем равносторонний треугольник
    
    const perimeter = side1 + side2 + side3;
    const s = perimeter / 2; // полупериметр для формулы Герона
    const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    
    return {
        area,                              // ❌ Не width * height
        perimeter,                         // ❌ Не 2 * (width + height)
        info: `Triangle: sides=${side1},${side2},${side3}` // ❌ Не `Rectangle: ${width}x${height}`
    };
};




// Функция, которая ожидает функцию с сигнатурой baseProcessShape, но может сломаться с функциями-обертками
function lspBadProcessShapes(processor: typeof baseProcessShape, shapes: Array<{width: number, height: number}>): {
    totalArea: number;
    totalPerimeter: number;
    infoArray: string[];
} {
    let totalArea = 0;
    let totalPerimeter = 0;
    const infoArray: string[] = [];
    
    shapes.forEach((shape, index) => {
        try {
            // ❌ ПРОБЛЕМА: Код ожидает поведение processRectangle, но получает другое
            const result = processor(shape.width, shape.height);
            
            // ❌ НАРУШЕНИЕ LSP: result.area может быть вычислена по-другому
            // Ожидается: area = width * height (как в processRectangle)
            // Получается: может быть π * width² (processCircle) или формула Герона (processTriangle)
            totalArea += result.area;
            
            // ❌ НАРУШЕНИЕ LSP: result.perimeter может быть вычислен по-другому
            // Ожидается: perimeter = 2 * (width + height) (как в processRectangle)
            // Получается: может быть 2π * width (processCircle) или sum(sides) (processTriangle)
            totalPerimeter += result.perimeter;
            
            // ❌ НАРУШЕНИЕ LSP: result.info может иметь другой формат
            // Ожидается: "Rectangle: widthxheight" (как в processRectangle)
            // Получается: может быть "Circle: radius=X" (processCircle) или "Triangle: sides=X,Y,Z" (processTriangle)
            infoArray.push(result.info);
            
        } catch (error: any) {
            // ❌ НАРУШЕНИЕ LSP: processSquare может выбросить исключение для неквадратных фигур
            // Ожидается: функция всегда работает без исключений (как processRectangle)
            // Получается: может выбросить исключение при нарушении контракта
            infoArray.push(`Error: ${error.message}`);
        }
    });
    
    return {
        totalArea,
        totalPerimeter,
        infoArray
    };
}

// Использование - демонстрация проблем
const lspShapes = [
    { width: 4, height: 6 },  // прямоугольник
    { width: 5, height: 5 },  // квадрат
    { width: 3, height: 4 },  // треугольник (стороны 3, 4, 3)
    { width: 7, height: 3 }   // попытка создать "неквадратный квадрат"
];

// ✅ Базовая функция работает корректно
const rectangleResult = lspBadProcessShapes(baseProcessShape, lspShapes);

// ❌ НАРУШЕНИЕ LSP: функция-обертка для круга нарушает контракт processRectangle
// Ожидается: area = width * height, perimeter = 2 * (width + height)
// Получается: area = π * width², perimeter = 2π * width
const circleResult = lspBadProcessShapes(processCircle, lspShapes);

// ❌ НАРУШЕНИЕ LSP: функция-обертка для треугольника нарушает контракт processRectangle
// Ожидается: area = width * height, perimeter = 2 * (width + height)
// Получается: area = формула Герона, perimeter = sum(sides)
const triangleResult = lspBadProcessShapes(processTriangle, lspShapes);

// ❌ НАРУШЕНИЕ LSP: функция-обертка для квадрата нарушает контракт processRectangle
// Ожидается: всегда работает без исключений
// Получается: может выбросить исключение для прямоугольников
const squareResult = lspBadProcessShapes(processSquare, lspShapes);