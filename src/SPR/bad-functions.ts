// ❌ ПЛОХО: Нарушение SRP - одна функция делает всё для всех фигур
function ProcessShape(shapeType: 'circle' | 'rectangle', radius?: number, width?: number, height?: number): {area: number, perimeter: number} {
    if (shapeType === 'circle') {
        // Валидация круга
        if (!radius || radius <= 0) throw new Error('Invalid circle radius');
        
        // Расчет площади круга
        const area = Math.PI * radius * radius;
        
        // Расчет периметра круга
        const perimeter = 2 * Math.PI * radius;
        
        return {area, perimeter};

    } else if (shapeType === 'rectangle') {
        // Валидация прямоугольника
        if (!width || !height || width <= 0 || height <= 0) {
            throw new Error('Invalid rectangle dimensions');
        }
        
        // Расчет площади прямоугольника
        const area = width * height;
        
        // Расчет периметра прямоугольника
        const perimeter = 2 * (width + height);
        
        return {area, perimeter};
    }

    throw new Error('Invalid shape type')
}

// Использование
const circleParams = ProcessShape('circle', 5);
const rectangleParams = ProcessShape('rectangle', undefined, 4, 6);

export {}
