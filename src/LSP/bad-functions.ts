// ❌ ПЛОХО: Нарушение LSP - функции не могут работать с разными типами фигур
//
// ПРОБЛЕМЫ:
// 1. Нарушение контракта - функции ожидают конкретные типы, а не общий интерфейс
// 2. Дублирование кода - похожая логика повторяется для разных типов
// 3. Нарушение принципа подстановки - функции не работают с подтипами
// 4. Сложность расширения - нужно добавлять новые функции для новых типов
// 5. Нарушение полиморфизма - код должен знать конкретный тип

// ❌ НАРУШЕНИЕ LSP: Функции работают только с конкретными типами
// Не могут заменить один тип на другой без изменения кода

// Функция только для прямоугольников
function badProcessRectangle(width: number, height: number): void {
    const area = width * height;
    const perimeter = 2 * (width + height);
    
    console.log(`Rectangle: ${width}x${height}`);
    console.log(`Area: ${area.toFixed(2)}`);
    console.log(`Perimeter: ${perimeter.toFixed(2)}`);
}

// ❌ ПРОБЛЕМА: Отдельная функция для кругов - дублирование логики
function badProcessCircle(radius: number): void {
    const area = Math.PI * radius * radius;
    const perimeter = 2 * Math.PI * radius;
    
    console.log(`Circle: radius=${radius}`);
    console.log(`Area: ${area.toFixed(2)}`);
    console.log(`Perimeter: ${perimeter.toFixed(2)}`);
}

// ❌ ПРОБЛЕМА: Отдельная функция для треугольников - еще больше дублирования
function badProcessTriangle(side1: number, side2: number, side3: number): void {
    const perimeter = side1 + side2 + side3;
    const s = perimeter / 2; // полупериметр для формулы Герона
    const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    
    console.log(`Triangle: sides=${side1},${side2},${side3}`);
    console.log(`Area: ${area.toFixed(2)}`);
    console.log(`Perimeter: ${perimeter.toFixed(2)}`);
}

// ❌ ПРОБЛЕМА: Отдельная функция для квадратов - еще больше дублирования
function badProcessSquare(side: number): void {
    const area = side * side;
    const perimeter = 4 * side;
    
    console.log(`Square: side=${side}`);
    console.log(`Area: ${area.toFixed(2)}`);
    console.log(`Perimeter: ${perimeter.toFixed(2)}`);
}

// ❌ НАРУШЕНИЕ LSP: Функция сравнения требует знания конкретных типов
function badCompareShapes(shape1Type: string, shape1Data: any, shape2Type: string, shape2Data: any): void {
    let area1: number, area2: number, perimeter1: number, perimeter2: number;
    
    // ❌ ПРОБЛЕМА: Нужно знать конкретный тип для правильного расчета
    if (shape1Type === 'rectangle') {
        area1 = shape1Data.width * shape1Data.height;
        perimeter1 = 2 * (shape1Data.width + shape1Data.height);
    } else if (shape1Type === 'circle') {
        area1 = Math.PI * shape1Data.radius * shape1Data.radius;
        perimeter1 = 2 * Math.PI * shape1Data.radius;
    } else if (shape1Type === 'triangle') {
        perimeter1 = shape1Data.side1 + shape1Data.side2 + shape1Data.side3;
        const s1 = perimeter1 / 2;
        area1 = Math.sqrt(s1 * (s1 - shape1Data.side1) * (s1 - shape1Data.side2) * (s1 - shape1Data.side3));
    } else if (shape1Type === 'square') {
        area1 = shape1Data.side * shape1Data.side;
        perimeter1 = 4 * shape1Data.side;
    } else {
        throw new Error(`Unknown shape type: ${shape1Type}`);
    }
    
    // ❌ ПРОБЛЕМА: Дублирование логики для второго объекта
    if (shape2Type === 'rectangle') {
        area2 = shape2Data.width * shape2Data.height;
        perimeter2 = 2 * (shape2Data.width + shape2Data.height);
    } else if (shape2Type === 'circle') {
        area2 = Math.PI * shape2Data.radius * shape2Data.radius;
        perimeter2 = 2 * Math.PI * shape2Data.radius;
    } else if (shape2Type === 'triangle') {
        perimeter2 = shape2Data.side1 + shape2Data.side2 + shape2Data.side3;
        const s2 = perimeter2 / 2;
        area2 = Math.sqrt(s2 * (s2 - shape2Data.side1) * (s2 - shape2Data.side2) * (s2 - shape2Data.side3));
    } else if (shape2Type === 'square') {
        area2 = shape2Data.side * shape2Data.side;
        perimeter2 = 4 * shape2Data.side;
    } else {
        throw new Error(`Unknown shape type: ${shape2Type}`);
    }
    
    console.log(`Comparing ${shape1Type} vs ${shape2Type}:`);
    console.log(`Area difference: ${Math.abs(area1 - area2).toFixed(2)}`);
    console.log(`Perimeter difference: ${Math.abs(perimeter1 - perimeter2).toFixed(2)}`);
}

// ❌ НАРУШЕНИЕ LSP: Функция для массива требует знания всех типов
function badProcessShapeArray(shapes: Array<{type: string, data: any}>): void {
    console.log('Processing shape array...');
    
    shapes.forEach((shape, index) => {
        console.log(`\n--- Shape ${index + 1} ---`);
        
        // ❌ ПРОБЛЕМА: Нужно знать конкретный тип для правильной обработки
        switch (shape.type) {
            case 'rectangle':
                badProcessRectangle(shape.data.width, shape.data.height);
                break;
            case 'circle':
                badProcessCircle(shape.data.radius);
                break;
            case 'triangle':
                badProcessTriangle(shape.data.side1, shape.data.side2, shape.data.side3);
                break;
            case 'square':
                badProcessSquare(shape.data.side);
                break;
            default:
                console.log(`Unknown shape type: ${shape.type}`);
        }
    });
}

// Использование - демонстрация проблем
console.log('=== Individual processing:');
badProcessRectangle(4, 6);
badProcessCircle(5);
badProcessTriangle(3, 4, 5);
badProcessSquare(5);

console.log('\n=== Shape comparison:');
badCompareShapes('rectangle', {width: 4, height: 6}, 'circle', {radius: 5});
badCompareShapes('square', {side: 5}, 'triangle', {side1: 3, side2: 4, side3: 5});

console.log('\n=== Array processing:');
badProcessShapeArray([
    {type: 'rectangle', data: {width: 4, height: 6}},
    {type: 'circle', data: {radius: 5}},
    {type: 'triangle', data: {side1: 3, side2: 4, side3: 5}},
    {type: 'square', data: {side: 5}}
]); 