// ❌ ПЛОХО: Нарушение OCP - нужно изменять функции для добавления новых фигур
//
// ПРОБЛЕМЫ:
// 1. НЕ ЗАКРЫТ для изменения - каждый раз при добавлении новой фигуры нужно менять эту функцию
// 2. НЕ ОТКРЫТ для расширения - нет возможности добавить новую фигуру без изменения существующего кода
// 3. Длинная цепочка if-else - нарушение принципа единственной ответственности
// 4. Сложность тестирования - нужно тестировать всю функцию при добавлении новой фигуры
// 5. Риск сломать существующий функционал при добавлении новой фигуры

function calculateArea(shapeType: string, radius?: number, width?: number, height?: number): number {
    if (shapeType === 'circle') {
        if (!radius) throw new Error('Circle needs radius');
        return Math.PI * radius * radius;
        
    } else if (shapeType === 'rectangle') {
        if (!width || !height) throw new Error('Rectangle needs width and height');
        return width * height;
        
    } else if (shapeType === 'triangle') {
        // ❌ НАРУШЕНИЕ OCP: Чтобы добавить треугольник, нужно ИЗМЕНЯТЬ эту функцию!
        // Это означает, что функция НЕ ЗАКРЫТА для изменения
        if (!width || !height) throw new Error('Triangle needs base and height');
        return (width * height) / 2;
        
    } else if (shapeType === 'square') {
        // ❌ НАРУШЕНИЕ OCP: Чтобы добавить квадрат, снова ИЗМЕНЯЕМ функцию!
        // Каждая новая фигура требует изменения существующего кода
        if (!width) throw new Error('Square needs side');
        return width * width;
    }
    
    throw new Error('Unknown shape type');
}

function calculatePerimeter(shapeType: string, radius?: number, width?: number, height?: number): number {
    if (shapeType === 'circle') {
        if (!radius) throw new Error('Circle needs radius');
        return 2 * Math.PI * radius;
        
    } else if (shapeType === 'rectangle') {
        if (!width || !height) throw new Error('Rectangle needs width and height');
        return 2 * (width + height);
        
    } else if (shapeType === 'triangle') {
        // ❌ НАРУШЕНИЕ OCP: Снова изменяем функцию для треугольника!
        // Дублирование проблемы - та же функция, те же изменения
        if (!width) throw new Error('Triangle needs side');
        return 3 * width; // Упрощенно
        
    } else if (shapeType === 'square') {
        // ❌ НАРУШЕНИЕ OCP: И снова изменяем для квадрата!
        // Проблема повторяется в каждой функции
        if (!width) throw new Error('Square needs side');
        return 4 * width;
    }
    
    throw new Error('Unknown shape type');
}

function processShape(shapeType: string, radius?: number, width?: number, height?: number): {area: number, perimeter: number} {
    // ❌ НАРУШЕНИЕ OCP: Каждый раз нужно добавлять новые условия!
    // Эта функция зависит от других функций, которые тоже нарушают OCP
    const area = calculateArea(shapeType, radius, width, height);
    const perimeter = calculatePerimeter(shapeType, radius, width, height);
    
    return {area, perimeter};
}

// Использование
const circleParams = processShape('circle', 5);
const rectangleParams = processShape('rectangle', undefined, 4, 6);
const triangleParams = processShape('triangle', undefined, 4, 6);
const squareParams = processShape('square', undefined, 5); 

export {}