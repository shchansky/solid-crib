// ❌ ПЛОХО: Нарушение SRP - одна функция делает всё для всех фигур
function badProcessShape(shapeType: 'circle' | 'rectangle', radius?: number, width?: number, height?: number): void {
    if (shapeType === 'circle') {
        // Валидация круга
        if (!radius || radius <= 0) throw new Error('Invalid circle radius');
        
        // Расчет площади круга
        const area = Math.PI * radius * radius;
        
        // Расчет периметра круга
        const perimeter = 2 * Math.PI * radius;
        
        // Сохранение
        console.log(`Saving circle: radius=${radius}, area=${area.toFixed(2)}, perimeter=${perimeter.toFixed(2)}`);
        
        // Отображение
        console.log(`Circle: radius=${radius} -> Area: ${area.toFixed(2)}, Perimeter: ${perimeter.toFixed(2)}`);

    } else if (shapeType === 'rectangle') {
        // Валидация прямоугольника
        if (!width || !height || width <= 0 || height <= 0) {
            throw new Error('Invalid rectangle dimensions');
        }
        
        // Расчет площади прямоугольника
        const area = width * height;
        
        // Расчет периметра прямоугольника
        const perimeter = 2 * (width + height);
        
        // Сохранение
        console.log(`Saving rectangle: width=${width}, height=${height}, area=${area}, perimeter=${perimeter}`);
        
        // Отображение
        console.log(`Rectangle: ${width}x${height} -> Area: ${area}, Perimeter: ${perimeter}`);
    }
}

// Использование
badProcessShape('circle', 5);
badProcessShape('rectangle', undefined, 4, 6);
