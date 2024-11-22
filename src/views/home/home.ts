const viewer = new Cesium.Viewer('cesiumContainer', {
	terrainProvider: Cesium.createWorldTerrain(),
});

// 预设轨迹（可以从外部获取或者硬编码）
const presetPath = [
	Cesium.Cartesian3.fromDegrees(120.0, 30.0, 100.0),
	Cesium.Cartesian3.fromDegrees(120.1, 30.1, 120.0),
	Cesium.Cartesian3.fromDegrees(120.2, 30.2, 150.0),
	// 更多航点...
];

let currentIndex = 0;  // 当前航点索引
const totalPoints = presetPath.length;

// 创建无人机实体
const drone = viewer.entities.add({
	position: presetPath[0],  // 初始位置
	point: {
		pixelSize: 10,
		color: Cesium.Color.RED,
	},
	label: {
		text: 'Drone',
		font: '14pt sans-serif',
		verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
	},
	orientation: new Cesium.CallbackProperty(() => {
		const start = presetPath[currentIndex];
		const end = presetPath[currentIndex + 1] || start;  // 如果没有下一个点，则保持当前航向

		// 计算当前位置与下一个目标点的方向向量
		const delta = Cesium.Cartesian3.subtract(end, start, new Cesium.Cartesian3());

		// 计算航向角度（从北方顺时针旋转）
		const heading = Cesium.Math.atan2(delta.y, delta.x);

		// 使用航向生成四元数（旋转）
		return Cesium.Transforms.headingPitchRollQuaternion(start, new Cesium.HeadingPitchRoll(heading, 0, 0));
	}, false),
});

// 绘制预设轨迹（虚线）
const presetPolyline = viewer.entities.add({
	polyline: {
		positions: presetPath,
		width: 3,
		material: new Cesium.PolylineDashMaterialProperty({
			dashLength: 16.0,
		}),
	},
});

// 已飞行轨迹（实线）
const flownPositions = [];
const flownPolyline = viewer.entities.add({
	polyline: {
		positions: new Cesium.CallbackProperty(() => flownPositions, false),
		width: 3,
		material: Cesium.Color.YELLOW,
	},
});

// 更新无人机位置并控制航向
function updateDronePositionAndHeading() {
	if (currentIndex < totalPoints - 1) {
		const start = presetPath[currentIndex];
		const end = presetPath[currentIndex + 1];

		// 更新无人机的位置
		drone.position = new Cesium.CallbackProperty(() => end, false);

		// 更新航向：计算当前位置到下一个点的航向
		const delta = Cesium.Cartesian3.subtract(end, start, new Cesium.Cartesian3());
		const heading = Cesium.Math.atan2(delta.y, delta.x);

		// 更新航向
		drone.orientation = new Cesium.CallbackProperty(() => {
			return Cesium.Transforms.headingPitchRollQuaternion(start, new Cesium.HeadingPitchRoll(heading, 0, 0));
		}, false);

		// 增加索引，模拟飞行
		currentIndex++;

		// 将当前位置添加到已飞行轨迹
		flownPositions.push(end);
	}
}

// 模拟飞行（每秒更新一次位置）
const flightInterval = setInterval(() => {
	if (currentIndex >= totalPoints - 1) {
		clearInterval(flightInterval); // 飞行完成后停止
	} else {
		updateDronePositionAndHeading();
	}
}, 1000); // 每秒更新一次位置
